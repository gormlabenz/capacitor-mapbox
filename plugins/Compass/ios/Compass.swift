//
//  EchoPlugin.swift
//  App
//
//  Created by Gorm Labenz on 25.04.22.
//

import Capacitor
import Foundation
import Combine
import CoreLocation

@available(iOS 13.0, *)
@objc(Compass)
public class Compass: CAPPlugin, CLLocationManagerDelegate {
    let locationManager = CLLocationManager()
   
    @objc func setup(_ call: CAPPluginCall) {
        self.locationManager.delegate = self
        self.locationManager.headingFilter = 0.1
        call.resolve([:])
    }
    
    public func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        self.notifyListeners(
            "heading",
            data: [
                "magneticHeading": newHeading.magneticHeading,
            ]
        )
    }

    @objc func start(_ call: CAPPluginCall) {
        if CLLocationManager.headingAvailable() {
            self.locationManager.startUpdatingHeading()
        }
        call.resolve([:])
    }

    @objc func stop(_ call: CAPPluginCall) {
        if CLLocationManager.headingAvailable() {
            self.locationManager.stopUpdatingHeading()
        }
        call.resolve([:])
    }
}
