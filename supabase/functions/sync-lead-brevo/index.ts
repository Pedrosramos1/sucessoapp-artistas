const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const BodySchema = z.object({
  nome: z.string().min(1).max(100),
  email: z.string().email(),
  telefone: z.string().min(1).max(20),
  plataforma: z.string().optional(),
})

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

    const { nome, email, telefone, plataforma } = parsed.data

    // Split name into first/last
    const nameParts = nome.trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const brevoPayload = {
      email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        SMS: telefone,
        PLATAFORMA: plataforma || '',
      },
      updateEnabled: true,
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(brevoPayload),
    })

    const responseText = await response.text()

    if (!response.ok && response.status !== 204) {
      // 409 = contact already exists, which is fine with updateEnabled
      if (response.status !== 409) {
        console.error(`Brevo API error [${response.status}]: ${responseText}`)
        return new Response(
          JSON.stringify({ error: `Brevo API error: ${response.status}` }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
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
