package de.gormlabenz;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.Bridge;

@CapacitorPlugin(name = "Compass")
public class Compass extends Plugin  {

    public static Bridge staticBridge = null;

    @Override
    public void load() {
        staticBridge = this.bridge;
        java.lang.System.out.println("Compass successfully started");
    }

    public static void onMagneticHeading(double magneticHeading){
        Compass pushPlugin = Compass.getCompassInstance();
        if (pushPlugin != null) {
            pushPlugin.sendMagneticHeading(magneticHeading);
        }
    }

    @PluginMethod()
    public void getMagneticHeading(PluginCall call) {
        String value = call.getString("value");
        JSObject ret = new JSObject();
        ret.put("magneticHeading", value);
        call.resolve(ret);
    }

    public void sendMagneticHeading(double magneticHeading) {
        JSObject data = new JSObject();
        data.put("magneticHeading", magneticHeading);
        notifyListeners("heading", data, true);
    }


    public static Compass getCompassInstance() {
        if (staticBridge != null && staticBridge.getWebView() != null) {
            PluginHandle handle = staticBridge.getPlugin("Compass");
            if (handle == null) {
                return null;
            }
            return (Compass) handle.getInstance();
        }
        return null;
    }
}



