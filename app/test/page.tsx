// app/test/page.tsx
"use client";
import { api } from "@/utils/api";
export default function TestPage() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">tRPC Test</h1>
      {hello.data ? (
        <p className="text-green-600">{hello.data.greeting}</p>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}