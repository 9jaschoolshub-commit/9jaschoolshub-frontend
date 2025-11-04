import logo from '../../assets/images/logo.svg'

const Logo = () => {
  return (
    <figure className="flex items-center justify-center space-x-2 w-max">
      <img src={logo} alt="9jaschoolshub Logo" width={43} height={38} />
      <figcaption
        className="text-xl font-bold
         'text-white"
      >
        9jaschoolshub
      </figcaption>
    </figure>
  )
}
export default Logo
