package de.gormlabenz.capmap;

import android.app.Activity;
import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;

import de.gormlabenz.Compass;

public class MainActivity extends BridgeActivity implements SensorEventListener {
    private Compass compass;

    private SensorManager sensorManager;
    private Sensor mAccelerometer;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(Compass.class);

        java.lang.System.out.println("Heading successfully started");
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mAccelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        sensorManager.registerListener(MainActivity.this, mAccelerometer, SensorManager.SENSOR_DELAY_NORMAL);

    }

    @Override
    public void onSensorChanged(SensorEvent event){
        Log.i("Heading", String.valueOf(event.timestamp));
        float degree = Math.round(event.values[0]);
        Compass compass = Compass.getCompassInstance();

        if (compass == (Compass)compass){
            compass.sendMagneticHeading(degree);
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        Log.i("Heading", String.valueOf(accuracy));
    }

}