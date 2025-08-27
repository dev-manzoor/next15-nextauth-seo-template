"use client";

import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "unauthenticated" || !session || !session.user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Signed out successfully!");
    } catch (_error) {
      toast.error("Failed to sign out");
    }
  };

  const user = session.user;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>
              {user.name?.charAt(0)?.toUpperCase() ||
                user.email?.charAt(0)?.toUpperCase() ||
                "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium">{user.name || "User"}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSignOut} variant="outline" className="w-full">
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
