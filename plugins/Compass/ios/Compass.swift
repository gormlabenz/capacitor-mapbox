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
    var magneticHeading: Double = .zero
    let locationManager = CLLocationManager()
   
    
    override public func load() {
        self.setup()
    }
    
    private func setup() {
        self.locationManager.requestWhenInUseAuthorization()
        self.locationManager.delegate = self
        self.locationManager.headingFilter = 0.01
        
        if CLLocationManager.headingAvailable() {
            self.locationManager.startUpdatingHeading()
        }
    }
    
    public func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        self.magneticHeading = newHeading.magneticHeading
        self.notifyListeners(
            "heading",
            data: [
                "timestamp": newHeading.timestamp,
                "magneticHeading": newHeading.magneticHeading,
            ]
        )
    }
    
    @objc func getMagneticHeading(_ call: CAPPluginCall) {
        call.resolve(["magneticHeading": self.magneticHeading])
    }

    
}
