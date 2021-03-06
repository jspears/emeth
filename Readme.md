Emeth
===
Emeth is a super simple little tool for making css modules easier to deal with.
It allows for classes to be themed, with little extra work, and makes it easy
to find css classes that are  not being used.

## Demo
See it in action [here](https://jspears.github.io/emeth/)

Or run it 

```sh
  git clone git@github.com:jspears/emeth.git
  cd emeth
  npm install
  npm run start &
  open http://localhost:8082
```

## Installation
```sh
 $ npm install emeth
```

## Usage
There are three things at play using emeth.
First CSS modules, it helps with them but, technically you don't need them.
They got "installed" with the theme function.

To access the theme css, pass your class to themeClass and it will return
a function that can be used for injecting your classes

### Installing a theme
Setup your components in module like so.
theme.js
```es6
 import './YourComponent.less';
 import emeth from 'emeth';
 export default emeth({YourComponent});

```

### Accessing a theme
YourComponent.js
```jsx

import {themeClass} from 'emeth';
//you may not want to do this, as it will make it hard to use different
// themes with your app.   but it needs to be somewhere
import './theme';

export default class YourComponent extends PureComponent {

    return <div className={tc('your-component')}>
      <span className={tc('something', 'else')}>Theme Me</span>
    </div>

}

const tc = themeClass(YourComponent);


```

### Using a theme

