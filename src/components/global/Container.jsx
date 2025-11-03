const Container = ({ children, className }) => {
  return (
    <div className={`px-4 md:px-6 ${className}`}>
      <div className="max-w-6xl xl:max-w-7xl mx-auto">{children}</div>
    </div>
  )
}
export default Container
