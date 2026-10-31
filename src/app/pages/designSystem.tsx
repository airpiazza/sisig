import { Button, Icon, Logo } from "@/design-system";

export default function DesignSystem() {
  return (
    <main className="flex flex-col gap-12 p-8">
      <h1 className="text-5xl">Sisig design system</h1>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl">Tokens</h2>
        <div className="flex items-center gap-4">
          <div className="size-16 rounded bg-ink" />
          <code>--color-ink #656363</code>
        </div>
        <p className="text-2xl">
          --font-sans: First Try. The quick brown fox jumps over the lazy dog.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl">Button</h2>
        <Button>Login with passkey</Button>
        <Button isLoading>Login with passkey</Button>
        <Button variant="text-icon" icon="faceId">
          Login with passkey
        </Button>
        <Button variant="text-icon" icon="faceId" isLoading>
          Login with passkey
        </Button>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl">Icon</h2>
        <div className="flex items-center gap-4">
          <Icon name="faceId" size="sm" />
          <Icon name="faceId" size="md" />
          <Icon name="faceId" size="lg" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl">Logo</h2>
        <Logo size="sm" />
        <Logo size="md" />
        <Logo size="lg" />
      </section>
    </main>
  );
}
