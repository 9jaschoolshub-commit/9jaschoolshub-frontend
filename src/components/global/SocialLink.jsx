const SocialLink = ({ url, icon }) => {
  const IconComponent = icon
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
    </a>
  )
}
export default SocialLink
