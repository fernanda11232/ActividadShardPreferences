package com.example.casodeestudio

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val helpButton1 = findViewById<Button>(R.id.help_button)
        helpButton1.setOnClickListener {
            showHelpScreen()
        }

        val buttonNot = findViewById<Button>(R.id.buttonVerNotas)
        buttonNot.setOnClickListener {
            verNotas()
        }

    }

    private fun verNotas() {
        // Muestra la pantalla de ver notas
        val intent = Intent (  this, pantallaVerNotas::class.java )


        startActivity(intent)
    }

    private fun showHelpScreen() {
        // Muestra la pantalla de ayuda
        val intent = Intent (  this, pantallaDeAyuda::class.java )


        startActivity(intent)

    }
}

