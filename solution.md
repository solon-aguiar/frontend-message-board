# My Cliniko Message board!
This doc contains some instructions and thoughts about my solution.

## How to run
Running the solution should only require you to run:
```
npm install && npm start
```

It will start the web application in the default port (`8080`), so opening it in [your browser](http://localhost:8080/) should work. I haven't tested if it works with `yarn`. It probably does...

The only change I made to the start up configuration was adding add a `CopyWebpackPlugin` to the `webpack.dev.js` so that I could serve locally, in dev, the two static assets I added.

All of the new dependencies I added are reflected on the `package.json` file, so they should be installed without any problems when you run the command above.

## Frameworks used

I used React and Redux to solve the task. I chose these two mostly because I am familiar with them and they solve this problem well while also scaling for future evolution. Since the time was limited I didn't adventure myself in trying new technologies this time.

I also used some frameworks for testing which I will list in the next section.

## Testing

All the requirements listed in the readme and noticed in the provided video are tested via unit tests (which aren't limited only to the requirements). The tests have their description in terms of the behavior of the application, so they also serve as a mechanism of documentation.

For unit testing I chose [jest](https://jestjs.io/) as it is simple, very powerful and familiar to me. To test the React components and containers, its interactions and behavior I used [enzyme](https://github.com/airbnb/enzyme). For some of the remote requests mocking I used the [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock).

I created the whole application from the beginning with testing in mind. Obviously I ran many smoke tests on the browser every now and then, but I relied heavily on the automation I created.

I considered adding one or two end 2 end tests that would open the browser and perform all the operations to check if everything worked well together (using something similar, but hopefully faster, to selenium). As I investigated options (as I haven't written this sort of testing in a while), the trade-off of what it would take to get it working, the time these they would take to run and the fact that the whole application was heavily unit tested didn't seem good to me. Since the unit tests are very thorough I decided to rely just on them.

## Limitations
### Browser support
For making the remote requests to the service API, I've used the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and in order to cancel pending requests I've decided to use the [AbortController API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). I understand that while that makes my life as a developer simple it poses a limitation on the browse support (especially for the [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController#Browser_compatibility)). This is a limitation of the current solution that I believe is okay for the purposes of this time limited task.

I smoke tested successfully the implementation on three browsers:
* Chrome: Version 67.0.3396.99 (Official Build) (64-bit)
* Mozilla Firefox: Version 61.0.2 (64-bit)
* Safari: Version 11.1.2 (13605.3.8)

### No localization and i18n

All the strings displayed in the page are hard-coded to English words and sentence structure. I kept as much as I could the components generic: most of them can receive the strings to be displayed, so that in case localization and i18n is needed at some point, it can be performed at a top level and just passed it down. This way, we can have content displayed in the proper language.

### No Pagination

None of the remote requests to fetch the colors and messages are paginated. They request all the data available. That is fine for the purposes of this task and maybe even in production when we know for sure that the size of the data is small or that we can tolerate longer wait times.

### No remote request error handling

The interface doesn't display any problem that might occur when making remote requests. The failures are saved in the redux state and handled appropriately by the code that makes the calls, but no message is shown on the screen and no failed request is retried.