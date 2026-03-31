const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-extrabold text-xl text-foreground">Sucesso</span>
          <span className="font-display font-extrabold text-xl text-highlight">.App</span>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} SucessoApp. Todos os direitos reservados.
        </p>
        <a
          href="mailto:contato@sucessoapp.com"
          className="text-sm text-muted-foreground hover:text-highlight transition-colors"
        >
          Suporte
        </a>
      </div>
    </footer>
  );
};

export default Footer;