import Container from "../Container/index";

export const Header = () => {
  return (
    <div className="absolute top-0 left-0 z-10 w-full">
      <Container>
        <header className="pt-5 md:pt-8 pb-5 md:pb-8">
          <nav className="w-full flex justify-between">
            <div className="">Project Name</div>
            <button className="px-4 py-2 border-2 border-white/50 rounded-lg text-white text-sm hover:border-white hover:bg-white/10 transition-all duration-200 ease-in-out">
              Go to site
            </button>
          </nav>
        </header>
      </Container>
    </div>
  );
};
