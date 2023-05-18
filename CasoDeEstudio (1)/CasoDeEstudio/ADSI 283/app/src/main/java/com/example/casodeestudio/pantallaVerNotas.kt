package com.example.casodeestudio

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class pantallaVerNotas : AppCompatActivity() {

    var ingresarNot : EditText? = null
    var ingresarTitulo : EditText? = null
    var ingresarContenido : EditText? = null
    var imprimirNotas : TextView? = null
    var imprimirTit : TextView? = null
    var imprimirCont : TextView? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pantalla_ver_notas)

        iniciarComponentes()
        eliminarNotas()
        guardarNot()
        cargarNot()

        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        val isFirstRun = sharedPreferences.getBoolean("isFirstRun", true)
        if (isFirstRun) {

            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)

            val editor = sharedPreferences.edit()
            editor.putBoolean("isFirstRun", false)
            editor.apply()


        }

    }

    private fun iniciarComponentes() {

        val buttonGuNotas: Button = findViewById(R.id.guardarNotas)
        buttonGuNotas.setOnClickListener{guardarNot()}

        val buttonCaNotas: Button = findViewById(R.id.cargarNotas)
        buttonCaNotas.setOnClickListener{cargarNot()}

        val buttonEliminar: Button = findViewById(R.id.buttonEliminar)
        buttonEliminar.setOnClickListener{eliminarNotas()}

        ingresarNot = findViewById<EditText>(R.id.ingresarNota)
        ingresarTitulo = findViewById<EditText>(R.id.ingresarTitulo)
        ingresarContenido = findViewById<EditText>(R.id.ingresarContenido)
        imprimirNotas = findViewById(R.id.imprimirNota)
        imprimirTit = findViewById(R.id.imprimirTitulo)
        imprimirCont = findViewById(R.id.imprimirContenido)
    }


    private fun guardarNot() {

        var preferences : SharedPreferences=getSharedPreferences("credenciales", Context.MODE_PRIVATE)  //obtiene una instancia de SharedPreferences utilizando un nombre de archivo ("credenciales")
        var notas = ingresarNot?.text.toString()  //obtiene el valor ingresado de la nota para asi guardala en la variable notas
        var titulo = ingresarTitulo?.text.toString()  //obtiene el valor ingresado del titulo para asi guardala en la variable titulo
        var contenido = ingresarContenido?.text.toString()  //obtiene el valor ingresado del contenido para asi guardala en la variable contenido

        var editor : SharedPreferences.Editor = preferences.edit()
        editor.putString("nota", notas)  // se esta guardando los valores en este caso la nota
        editor.putString("titulo", titulo)  // se esta guardando los valores en este caso el titulo
        editor.putString("cont", contenido)  // se esta guardando los valores en este caso el contenido

        editor.apply()  //se utiliza para aplicar los cambios realizados en un editor de SharedPreferences
        Toast.makeText(this, "Se han registrado los datos ", Toast.LENGTH_SHORT).show() //imprime una mensaje

    }


        private fun eliminarNotas() {
            val preferences: SharedPreferences = getSharedPreferences("credenciales", Context.MODE_PRIVATE)
            val editor: SharedPreferences.Editor = preferences.edit()

            editor.remove("nota")
            editor.remove("titulo")
            editor.remove("cont")

            editor.apply()

            Toast.makeText(this, "Notas eliminadas", Toast.LENGTH_SHORT).show()
        }



    private fun cargarNot() {

        var preferences : SharedPreferences=getSharedPreferences("credenciales", Context.MODE_PRIVATE) //obtiene una instancia de SharedPreferences utilizando un nombre de archivo ("credenciales")

        var notas = ingresarNot?.text.toString()
        var titulo = ingresarTitulo?.text.toString()
        var contenido = ingresarContenido?.text.toString()

        var editor : SharedPreferences.Editor = preferences.edit()  //Se obtiene una instancia de SharedPreferences.Editor
        editor.putString("nota", notas)  // se esta guardando los valores en este caso la nota para que se cargue en la pantalla
        editor.putString("titulo", titulo)   // se esta guardando los valores en este caso el titulo  para que se cargue en la pantalla
        editor.putString("cont", contenido) // se esta guardando los valores en este caso el contenido  para que se cargue en la pantalla

        imprimirNotas?.text = notas  // imprime la nota en el textview
        imprimirTit?.text = titulo  //imprime el titulo en el textview
        imprimirCont?.text = contenido  //imprime el contenido en el textview


    }




}
