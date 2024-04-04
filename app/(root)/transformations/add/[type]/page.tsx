import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.actions';


const AddTranformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const transformation = transformationTypes[type];
  const { userId } = auth();
  console.log(userId,1)
  if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);
  if(!user) redirect('/sign-in')
  console.log(user)
  return (
      <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={userId}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTranformationTypePage
