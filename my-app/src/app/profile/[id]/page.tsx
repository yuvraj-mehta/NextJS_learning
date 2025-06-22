export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl font-bold">
        This is the profile page for user ID:{" "}
        <span className="text-blue-500">{resolvedParams.id}</span>
      </p>
    </div>
  );
}
