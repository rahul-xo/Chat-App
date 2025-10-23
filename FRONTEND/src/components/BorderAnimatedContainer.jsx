function BorderAnimatedContainer({ children }) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,theme(colors.slate.600/.48)_80%,_theme(colors.cyan.500)_86%,_theme(colors.cyan.300)_90%,_theme(colors.cyan.500)_94%,_theme(colors.slate.600/.48))] animate-spin-slow" style={{ animationDuration: '4s' }}></div>
      <div className="relative w-full h-full bg-[linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)] rounded-2xl border border-transparent flex overflow-hidden m-[1px]">
        {children}
      </div>
    </div>
  );
}


export default BorderAnimatedContainer;