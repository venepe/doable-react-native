# Doable

Inside Xcode, I clicked on the Voice.xcodeproj file under Libraries and added this to Build Settings/Search Paths/Header Search Paths: $(SRCROOT)/../../../ios/Pods/Headers/Private/React. That got rid of the error temporarily but it's not the proper solution since it required a change to node_modules file (project.pbxproj).
