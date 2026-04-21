import logo from "@/assets/logo-horizontal.png";

const Footer = () => {

  return (
    <footer className="border-t border-border/50 pt-8 pb-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <img src={logo} alt="Sucesso.App" className="h-7" />

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://sucessoapp.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="https://sucessoapp.com/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Termos de Uso
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61577833469104"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/sucessoapp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 mb-5" />

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4">
          Todas as marcas e logotipos de terceiros são propriedade de seus respectivos donos e usados apenas para fins informativos. Sucesso.App não possui vínculo ou endosso com artistas ou plataformas mencionados. Conteúdo protegido por direitos autorais.
        </p>

        {/* Copyright + email */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sucesso.App - Todos os direitos Reservados
        </p>
        <a
          href="mailto:suporte@sucessoapp.com"
          className="text-sm text-primary hover:text-accent transition-colors"
        >
          suporte@sucessoapp.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
