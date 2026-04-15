export default function FooterMinimal() {
  return (
    <footer className="border-t border-border py-6 text-center">
      <p className="text-[0.75rem] text-text-muted">
        &copy; 2026 Фундація адвокатів України &middot;{" "}
        <a
          href="/"
          className="text-text-muted underline underline-offset-2 hover:text-primary"
        >
          vash-advokat.org
        </a>
      </p>
    </footer>
  );
}
