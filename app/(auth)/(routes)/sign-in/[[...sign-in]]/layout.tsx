import FondoSignUp from 'public/fondosign.jpg'

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div 
            className="h-full flex items-center justify-center bg-center"
            style={{ backgroundImage: 'url(/fondosign.jpg)', }} 
            >
            {children}
        </div>
    )
}

export default AuthLayout