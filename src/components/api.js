const domain = 'https://56ad63884793.ngrok.io';
export const ChangePassword = domain + '/api/change-password';
export const Profile = domain + '/api/profile';
export const SignIn = domain + '/api/login';
export const SignUp = domain + '/api/register';
export const Feedget = domain + '/api/feed';
export const AddPost_ = domain + '/api/post';
export const SearchRes = domain + '/api/explore';
export const ProfileGet = domain + '/api/show';
export const MyReviewsGet = domain + '/api/profileSearch'
export const EditProfile = domain + '/api/editProfile';

export const options = {
  headers: {'Content-Type': 'application/json'},
};

// /api/profile  — {token,public_name,cusins,age}
// /api/change-password —- {token,newpassword}
// /api/login —- {username,password}
// /api/register —-  {username,password}
// /api/feed —- {pagenum,token}
// /api/post —- {token,title,Location,cusins,Discription,Imageurl,Likes,Liked}
// /api/explore —- {token,title}
// /api/profileSearch —-{token , from }  // from :"foodies"
// /api/editProfile  — {token,public_name,cusins,age}
///api/show --