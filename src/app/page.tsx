import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { UserProfile } from "@/components/auth/user-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import Image from "next/image";

export async function generateMetadata() {
  return generatePageMetadata(
    "Next.js 15 Auth Template - Modern Authentication & SEO",
    "Production-ready Next.js 15 template with NextAuth.js authentication, shadcn/ui components, and optimized SEO. Built for modern web development with TypeScript, Tailwind CSS, and best practices.",
    "/",
    {
      keywords: [
        "Next.js 15",
        "NextAuth.js",
        "Authentication",
        "shadcn/ui",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "SEO Optimized",
        "Modern Web Development",
        "Full Stack",
        "Template",
        "Starter Kit"
      ],
      type: "website"
    }
  );
}

export default async function Home() {
  const session = await auth();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: process.env.SITE_URL || "https://your-domain.com" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Next.js 15 + Auth.js + shadcn/ui
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Modern authentication with beautiful UI components.
              Production-ready template with optimized SEO, TypeScript, and best
              practices for 2025.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {session?.user ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome back!</CardTitle>
                    <CardDescription>
                      You are successfully authenticated with Auth.js
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <UserProfile />
                      <Card>
                        <CardHeader>
                          <CardTitle>Session Info</CardTitle>
                          <CardDescription>
                            Your current session details
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <span className="font-medium">Name:</span>{" "}
                            {session.user.name}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span>{" "}
                            {session.user.email}
                          </div>
                          <div>
                            <span className="font-medium">Provider:</span>{" "}
                            {session.user.provider || "credentials"}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>
                      Sign in to your account or create a new one to explore the
                      authentication features.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="signin" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      </TabsList>
                      <TabsContent value="signin" className="mt-6">
                        <div className="flex justify-center">
                          <SignInForm />
                        </div>
                      </TabsContent>
                      <TabsContent value="signup" className="mt-6">
                        <div className="flex justify-center">
                          <SignUpForm />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">🔐 Secure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Built with Auth.js for secure authentication and session
                        management.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">🎨 Beautiful</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Styled with shadcn/ui components for a modern,
                        accessible interface.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">⚡ Fast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Optimized for performance with Next.js 15 and React 19.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
