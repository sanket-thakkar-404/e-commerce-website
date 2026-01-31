for user model 

user model 
- full name - string, - required
- Email - string - required
- password - string - decode ma 
- verification-code - number
- verificationCodeExpiry: Date
- isVerified - boolean 
- IsResendCode - boolean 
- resendCount: { type: Number, default: 0 }
- lastResendAt: Date
- contact - number - required
- isAdmin - boolean. 
- order - array 
- wishlist - array
- profilePic - string 



product model 
- Name - string
- description - string
- images - string
- reviews - array 
- category - men , women , leather-bag
- discountRate - number
- uiTheme : 
  - bgColor: String,
  - panelColor: String,
  - textColor: String
- Price - number 
- color - string 
- fabric - string
- sizes - string

