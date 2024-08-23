import { setSession } from '@/utils/session'

export default async function BranchesLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  const { token } = await setSession()

  return (
    <>
    { children }
    { modal }
    </>
  );
}