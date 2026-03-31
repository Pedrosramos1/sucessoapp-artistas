const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-xl text-foreground">Sucesso</span>
          <span className="font-display font-bold text-xl text-primary">App</span>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} SucessoApp. Todos os direitos reservados.
        </p>
        <a
          href="mailto:contato@sucessoapp.com"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Suporte
        </a>
      </div>
    </footer>
  );
};

export default Footer;
