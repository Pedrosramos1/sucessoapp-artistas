const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const BodySchema = z.object({
  nome: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  telefone: z.string().trim().min(1).max(30),
  plataforma: z.string().trim().optional(),
  perfil: z.string().trim().optional(),
})

const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, '')

  if (!digits) return null
  if (value.trim().startsWith('+')) return `+${digits}`
  if (digits.startsWith('55')) return `+${digits}`
  if (digits.length <= 11) return `+55${digits}`

  return `+${digits}`
}

const isLikelyValidPhone = (phone: string | null) => {
  if (!phone || !/^\+\d{12,15}$/.test(phone)) return false

  const nationalDigits = phone.startsWith('+55') ? phone.slice(3) : phone.slice(1)

  if (/^(\d)\1+$/.test(nationalDigits)) return false
  if (/0{8,}/.test(nationalDigits)) return false

  return true
}

const sendToBrevo = async (apiKey: string, payload: Record<string, unknown>) => {
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseText = await response.text()

  return {
    ok: response.ok || response.status === 204 || response.status === 409,
    status: response.status,
    responseText,
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')
  if (!BREVO_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'BREVO_API_KEY is not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await req.json()
    const parsed = BodySchema.safeParse(body)

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { nome, email, telefone, plataforma, perfil } = parsed.data
    const nameParts = nome.split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''
    const formattedPhone = normalizePhone(telefone)

    const attributes: Record<string, string> = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      PLATAFORMA: plataforma || '',
      PERFIL: perfil || '',
    }

    if (isLikelyValidPhone(formattedPhone)) {
      attributes.SMS = formattedPhone as string
    }

    let brevoPayload: Record<string, unknown> = {
      email,
      attributes,
      updateEnabled: true,
    }

    let result = await sendToBrevo(BREVO_API_KEY, brevoPayload)

    if (!result.ok && attributes.SMS && result.status === 400 && /invalid phone number/i.test(result.responseText)) {
      delete attributes.SMS
      brevoPayload = {
        email,
        attributes,
        updateEnabled: true,
      }
      result = await sendToBrevo(BREVO_API_KEY, brevoPayload)
    }

    if (!result.ok) {
      console.error(`Brevo API error [${result.status}]: ${result.responseText}`)
      return new Response(
        JSON.stringify({ error: `Brevo API error: ${result.status}` }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, phoneSkipped: !attributes.SMS && Boolean(formattedPhone) }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: unknown) {
    console.error('Error syncing to Brevo:', error)
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
