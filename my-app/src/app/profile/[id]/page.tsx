export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl font-bold">
        This is the profile page for user ID:{" "}
        <span className="text-blue-500">{params.id}</span>
      </p>
    </div>
  );
}
