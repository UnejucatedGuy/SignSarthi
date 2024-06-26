package com.signsarathi.mpholisticframeprocessor;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.mrousavy.camera.frameprocessor.FrameProcessorPluginRegistry;

import java.util.Collections;
import java.util.List;

public class MpHolisticFrameProcessorPluginPackage implements ReactPackage {
  static {
    FrameProcessorPluginRegistry.addFrameProcessorPlugin(
            "mpDetect",
            (proxy, options) -> new MpHolisticFrameProcessorPlugin(proxy, options)
    );
  }

  @NonNull
  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}