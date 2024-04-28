package com.signsarathi.mpholisticframeprocessor;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.mrousavy.camera.frameprocessor.Frame;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import com.mrousavy.camera.frameprocessor.VisionCameraProxy;
import java.util.Map;

public class MpHolisticFrameProcessorPlugin extends FrameProcessorPlugin {
  public MpHolisticFrameProcessorPlugin(@NonNull VisionCameraProxy proxy, @Nullable Map<String, Object> options) {
    super();
  }

  @Nullable
  @Override
  public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments) {

    
    // code goes here
    return "It really worked";
  }
}