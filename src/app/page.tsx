import { redirect } from 'next/navigation';

export default async function Page() {
  // if (!userId) {
  //   return redirect('/auth/sign-in');
  // } else {
  return redirect('/dashboard/overview');
  // }
}
