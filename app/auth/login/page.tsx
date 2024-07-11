"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";

export default function Page() {
  const userName = useRef("");
  const password = useRef("");

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="relative flex justify-center items-center overflow-hidden">
      <div className="heroImg w-2/3 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image
          src="/images/loginHero.webp"
          alt="login"
          width={960}
          height={1000}
          className=" h-[90.9vh]"
        />
      </div>
      <div className=" m-auto bg-white lg:max-w-lg w-1/3">
        <Card className=" border-none text-left">
          <CardHeader className="space-y-1 mb-8">
            <CardTitle className="text-4xl font-light text-left mb-3">Log in</CardTitle>
            <CardDescription className="text-left text-subHeading text-lg font-light">
             Welcome<br/>Please Enter Your Details.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 text-left">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base font-light">Username</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                onChange={(e) => (userName.current = e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-base font-light">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => (password.current = e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
