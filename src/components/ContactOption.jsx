const ContactOption = ({ heading, links }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-lg">{heading}</h3>
      <ul className="space-y-1.5 text-gray-50 ">
        {links.map(({ label, icon }) => {
          const IconComponent = icon
          return (
            <li key={label} className="flex items-center gap-2">
              <IconComponent className="w-5 h-5" />
              <span>{label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default ContactOption
