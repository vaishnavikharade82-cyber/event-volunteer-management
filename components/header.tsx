export default function Header() {
  return (
    <header className="px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">EventFlow</h1>

      <nav className="space-x-6 text-sm font-medium">
        <a href="#" className="hover:text-indigo-600">Features</a>
        <a href="#" className="hover:text-indigo-600">Events</a>
        <a href="#" className="hover:text-indigo-600">About</a>
      </nav>
    </header>
  );
}