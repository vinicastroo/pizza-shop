import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
export function SignIn() {
  const [searchParams] = useSearchParams()

  const signInForm = z.object({
    email: z.string().email(),
  })

  type SignInForm = z.infer<typeof signInForm>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: { email: searchParams.get('email') ?? '' },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function HandleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email })

      toast.success('Enviamos um link de autenticação no seu e-mail', {
        action: {
          label: 'Reenviar',
          onClick: () => HandleSignIn(data),
        },
      })
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="ghost">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(HandleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button className="w-full" disabled={isSubmitting}>
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
