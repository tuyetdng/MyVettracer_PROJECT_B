package com.lab6

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle

class MainActivity : ReactActivity() {
    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "Lab6"

    // Required for react-navigation
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null) // This is important for react-navigation
    }

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use DefaultReactActivityDelegate
     * here but you can replace it with your own [ReactActivityDelegate] instance.
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
