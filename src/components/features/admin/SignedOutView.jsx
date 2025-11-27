import { SignInButton } from "@clerk/clerk-react";
import sideImage from "../../../assets/images/uni-students.jpg";

const SignedOutView = () => {
  return (
    <div className="grid md:grid-cols-2 items-center min-h-screen bg-white">
      {/* Left Column: Content */}
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-md mx-auto text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Admin Control <span className="text-orange-500">Center</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            This is the central hub for managing the university data on
            9jaSchoolsHub. Please sign in to add, update, or delete university
            information.
          </p>
          <div className="mt-8">
            <SignInButton className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer shadow-lg hover:shadow-xl text-lg">
              Sign In to Continue
            </SignInButton>
          </div>
        </div>
      </div>
      {/* Right Column: Image */}
      <div className="hidden md:block h-screen py-4 mr-2">
        <img src={sideImage} alt="University Students" className="h-full w-full object-cover rounded-md" />
      </div>
    </div>
  );
};

export default SignedOutView;
