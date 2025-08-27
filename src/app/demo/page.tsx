"use client";

import { ContactForm } from "@/components/forms/contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme, useToast, useSidebar } from "@/stores/ui-store";
import { useUser, useUpdateLastActivity } from "@/stores/auth-store";

export default function DemoPage() {
  const theme = useTheme();
  const { success, error, warning, info } = useToast();
  const { isOpen, toggle } = useSidebar();
  const user = useUser();
  const updateLastActivity = useUpdateLastActivity();

  const handleToastDemo = (type: string) => {
    updateLastActivity();

    switch (type) {
      case "success":
        success("Success!", "This is a success toast message");
        break;
      case "error":
        error("Error!", "This is an error toast message");
        break;
      case "warning":
        warning("Warning!", "This is a warning toast message");
        break;
      case "info":
        info("Info!", "This is an info toast message");
        break;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Zod + Zustand Demo</h1>
        <p className="text-muted-foreground text-lg">
          Showcasing the latest Zod validation and Zustand state management
          implementation
        </p>
      </div>

      {/* State Management Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Zustand State Management Demo</CardTitle>
          <CardDescription>
            Interactive examples of global state management with Zustand
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Current Theme</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {theme}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Sidebar State</h3>
              <p className="text-sm text-muted-foreground">
                {isOpen ? "Open" : "Closed"}
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={toggle}
                className="mt-2"
              >
                Toggle
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">User Status</h3>
              <p className="text-sm text-muted-foreground">
                {user ? `Logged in as ${user.name}` : "Not logged in"}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Last Activity</h3>
              <p className="text-sm text-muted-foreground">
                {user ? "Click a toast button" : "Login to track"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Toast Notifications (Zustand Managed)
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => handleToastDemo("success")}
                variant="default"
              >
                Success Toast
              </Button>
              <Button
                onClick={() => handleToastDemo("error")}
                variant="destructive"
              >
                Error Toast
              </Button>
              <Button
                onClick={() => handleToastDemo("warning")}
                variant="secondary"
              >
                Warning Toast
              </Button>
              <Button onClick={() => handleToastDemo("info")} variant="outline">
                Info Toast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zod Validation Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Zod Schema Validation Demo</CardTitle>
          <CardDescription>
            Contact form with comprehensive Zod validation and React Hook Form
            integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>

      {/* Implementation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Features</CardTitle>
          <CardDescription>
            Latest patterns and best practices implemented
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Zod Features</h3>
              <ul className="space-y-2 text-sm">
                <li>• TypeScript-first schema validation</li>
                <li>• Comprehensive form validation schemas</li>
                <li>• Type inference for forms</li>
                <li>• Custom error messages</li>
                <li>• Complex validation rules (password strength, etc.)</li>
                <li>• Integration with React Hook Form</li>
                <li>• Email, password, and profile schemas</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Zustand Features</h3>
              <ul className="space-y-2 text-sm">
                <li>• Minimal boilerplate state management</li>
                <li>• TypeScript support with full type inference</li>
                <li>• DevTools integration for debugging</li>
                <li>• Persistence middleware for auth state</li>
                <li>• Computed selectors for performance</li>
                <li>• Modular store architecture</li>
                <li>• Auth and UI state management</li>
                <li>• Optimized re-renders with selectors</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
