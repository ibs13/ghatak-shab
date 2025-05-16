import ProtectedRoute from "@/components/protected-route";
import React from "react";

export default function dashboard() {
  return (
    <ProtectedRoute>
      <div>dashboard</div>
    </ProtectedRoute>
  );
}
