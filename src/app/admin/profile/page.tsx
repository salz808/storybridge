export default function ChurchProfile() {
  // This would fetch the church profile from the database based on the authenticated user's church
  const church = {
    name: 'Sample Grace Church',
    slug: 'sample-grace',
    logoUrl: 'https://via.placeholder.com/150',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Church Profile</h1>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {church.logoUrl && (
          <img src={church.logoUrl} alt={church.name} className="w-32 h-32 mx-auto mb-4 rounded-full" />
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Church Name</label>
          <p className="text-lg">{church.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Subdomain Slug</label>
          <p className="text-lg">{church.slug}.storybridge.com</p>
        </div>
      </div>
    </div>
  );
}
