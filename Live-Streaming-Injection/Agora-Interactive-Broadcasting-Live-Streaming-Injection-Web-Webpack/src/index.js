import RTCClient from './rtc-client';
import {getDevices, serializeFormData, validator, resolutions} from './common';
import "./assets/style.scss";
import * as M from 'materialize-css';

$(() => {
  $("#settings").on("click", function (e) {
    e.preventDefault();
    $(this).open(1);
  });

  getDevices(function (devices) {
    devices.audios.forEach(function (audio) {
      $('<option/>', {
        value: audio.value,
        text: audio.name,
      }).appendTo("#microphoneId");
    })
    devices.videos.forEach(function (video) {
      $('<option/>', {
        value: video.value,
        text: video.name,
      }).appendTo("#cameraId");
    })
    resolutions.forEach(function (resolution) {
      $('<option/>', {
        value: resolution.value,
        text: resolution.name,
      }).appendTo("#resolution");
    })
    M.AutoInit();
  })

  const fields = ['appID', 'channel', 'url'];

  let rtc = new RTCClient();

  $("#show_quality").on("change", function (e) {
    e.preventDefault();
    rtc.setNetworkQualityAndStreamStats(this.checked);
  });

  $("#join").on("click", function (e) {
    e.preventDefault();
    console.log("create")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.join(params);
    }
  })

  $("#addInjection").on("click", function (e) {
    e.preventDefault();
    console.log("addInjection")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.addRTMPInjectStream();
    }
  });

  $("#removeInjection").on("click", function (e) {
    e.preventDefault();
    console.log("removeInjection")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.removeRTMPInjectStream();
    }
  });

  $("#publish").on("click", function (e) {
    e.preventDefault();
    console.log("startLiveStreaming")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.publish();
    }
  });

  $("#unpublish").on("click", function (e) {
    e.preventDefault();
    console.log("stopLiveStreaming")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.unpublish();
    }
  });

  $("#leave").on("click", function (e) {
    e.preventDefault();
    console.log("leave")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.leave();
    }
  })
})