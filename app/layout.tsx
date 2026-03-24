import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter,Bebas_Neue, Lora } from "next/font/google";
import "./globals.css";
import Cabecalho from "@/componentsSite/Cabecalho";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";



const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const lora = Lora({ 
  subsets: ['latin'], 
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'], 
  style: ['normal', 'italic'],
});
export const metadata: Metadata = {
  title: "Home | Terra Nossa",
  description: "Entre produtos perto de você",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={cn("font-sans", inter.variable, lora.variable)}>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        
          
        
            <Cabecalho/>
          
              {children}
            
          <Toaster/>

      </body>
    </html>
  );
}