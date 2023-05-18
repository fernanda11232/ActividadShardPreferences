package layout.ShardPreferencesUtil

import android.content.Context

object xml {

    object SharedPreferencesUtil {
        private const val PREFS_NAME = "MyAppPrefs"
        private const val HELP_SHOWN_KEY = "helpShown"

        fun getBoolean(context: Context, key: String): Boolean {
            val sharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            return sharedPreferences.getBoolean(key, false)
        }

        fun setBoolean(context: Context, key: String, value: Boolean) {
            val sharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            sharedPreferences.edit().putBoolean(key, value).apply()
        }

        fun isHelpShown(context: Context): Boolean {
            return getBoolean(context, HELP_SHOWN_KEY)
        }

        fun setHelpShown(context: Context, value: Boolean) {
            setBoolean(context, HELP_SHOWN_KEY, value)
        }
    }

}