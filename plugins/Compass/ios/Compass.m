//
//  EchoPlugin.m
//  App
//
//  Created by Gorm Labenz on 25.04.22.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(Compass, "Compass",
    CAP_PLUGIN_METHOD(getMagneticHeading, CAPPluginReturnPromise);
)
