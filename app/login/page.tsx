"use client"
import {
  Card,

  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {Button} from"@/components/ui/button"
import { CircleX } from "lucide-react";
import Link from 'next/link'
export  default function Login() {
  return (
    <div className="flex flex-col justify-center pt-10">
    <Card className=" justify-center mx-auto w-100 h-100 max-w-md bg-green-800 border-none flex flex-col items-center p-4 ">
      <form className="flex flex-col gap-5">
        <CardTitle className="flex justify-end">
        
         <Link href="/">  <CircleX className="text-white cursor-pointer" /></Link>
        </CardTitle>
        <h1 className="text-2xl text-white font-extrabold text-center">Seja bem vindo de volta </h1>
      
        
          <Input className="w-70 placeholder:text-white" placeholder="Email"/>
           <Input className="w-70 placeholder:text-white" placeholder="Senha"/>
          <Button  className="w-70 h-10 cursor-pointer  backdrop-grayscale justify-center bg-white text-green-800 font-extrabold ">Logar</Button>
      </form>
    </Card>
    </div>
  )
}
