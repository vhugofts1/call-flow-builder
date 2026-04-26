import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Zap, Mail, Lock, User, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres").max(72),
});

const signupSchema = loginSchema.extend({
  nome: z.string().trim().min(2, "Informe o nome").max(100),
  cidade: z.string().trim().min(2, "Informe a cidade").max(60),
});

const LoginAtendente = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", nome: "", cidade: "São Paulo" });

  useEffect(() => {
    // Se já está logado, manda direto pro app
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/", { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const parsed = signupSchema.safeParse(form);
        if (!parsed.success) {
          toast({ title: "Verifique os dados", description: parsed.error.issues[0].message, variant: "destructive" });
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { nome: parsed.data.nome, cidade: parsed.data.cidade, cargo: "Atendente" },
          },
        });
        if (error) throw error;
        toast({ title: "Cadastro realizado", description: "Você já pode acessar o painel." });
      } else {
        const parsed = loginSchema.safeParse(form);
        if (!parsed.success) {
          toast({ title: "Verifique os dados", description: parsed.error.issues[0].message, variant: "destructive" });
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast({ title: "Bem-vindo de volta!" });
      }
    } catch (err: any) {
      const msg = err?.message || "Erro inesperado";
      toast({
        title: mode === "login" ? "Falha no login" : "Falha no cadastro",
        description: msg.includes("Invalid login") ? "E-mail ou senha incorretos." : msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-glow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary glow-orange">
            <Zap className="h-7 w-7 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <div className="text-xl font-bold tracking-wide text-glow">DELMATCH</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Painel do Atendente</div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="mb-5 flex gap-1 rounded-full bg-secondary p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-2 text-xs font-semibold transition-all ${
                mode === "login" ? "gradient-primary text-primary-foreground glow-orange" : "text-muted-foreground"
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full py-2 text-xs font-semibold transition-all ${
                mode === "signup" ? "gradient-primary text-primary-foreground glow-orange" : "text-muted-foreground"
              }`}
            >
              Criar conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="nome" className="text-xs uppercase tracking-wider text-muted-foreground">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      placeholder="Marina Souza" className="pl-9 bg-secondary border-border" maxLength={100} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cidade" className="text-xs uppercase tracking-wider text-muted-foreground">Cidade de atendimento</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="cidade" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                      placeholder="São Paulo" className="pl-9 bg-secondary border-border" maxLength={60} />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">E-mail corporativo</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="atendente@delmatch.com" className="pl-9 bg-secondary border-border" maxLength={255} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••" className="pl-9 bg-secondary border-border" maxLength={72} />
              </div>
            </div>

            <Button type="submit" disabled={loading} size="lg"
              className="h-12 w-full gradient-primary text-base font-bold text-primary-foreground glow-orange hover:opacity-90">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : mode === "login" ? "Entrar no painel" : "Criar conta de atendente"}
            </Button>
          </form>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Acesso restrito a atendentes autorizados · DelMatch Delivery
          </p>
        </div>

        <button onClick={() => navigate("/")} className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-primary">
          ← Voltar ao protótipo
        </button>
      </div>
    </div>
  );
};

export default LoginAtendente;
