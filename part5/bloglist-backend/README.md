The following command will run all of the tests that contain blogs in their name:
npm test -- -t 'blogs'

The -t option can be used for running tests with a specific name:
npm test -- -t "a specific note is within the returned blogs"

The following command only runs the tests found in the tests/blog_api.test.js file:
npm test -- tests/blog_api.test.js
