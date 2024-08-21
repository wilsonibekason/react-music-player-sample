import { useLayoutEffect, useEffect, useState } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { AudioPlayerProps } from ".";
import {
  audioPlayerDispatchContext,
  InterfacePlacement,
  PlayerPlacement,
  PlayListPlacement,
  VolumeSliderPlacement,
} from "../Context";

export const usePropsStateEffect = <TInterfacePlacementLength extends number>({
  placement = {},
  activeUI,
  coverImgsCss,
  audioInitialState,
  playList,
  customIcons,
}: Omit<AudioPlayerProps<TInterfacePlacementLength>, "children">) => {
  const [isMounted, setIsMounted] = useState(false);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useLayoutEffect(() => {
    if (!isMounted) return;
    const {
      player: playerPlacement,
      playList: playListPlacement,
      interface: interfacePlacement,
      volumeSlider: volumeSliderPlacement,
    } = placement as {
      player?: PlayerPlacement;
      playList?: PlayListPlacement;
      interface?: InterfacePlacement;
      volumeSlider?: VolumeSliderPlacement;
    };
    audioPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      playListPlacement,
      interfacePlacement,
      volumeSliderPlacement,
    });
  }, [audioPlayerDispatch, placement]);

  useLayoutEffect(() => {
    if (!isMounted || !activeUI) return;

    audioPlayerDispatch({ type: "SET_ACTIVE_UI", activeUI });
  }, [activeUI, audioPlayerDispatch]);

  useLayoutEffect(() => {
    if (!isMounted || !coverImgsCss) return;

    audioPlayerDispatch({ type: "SET_COVER_IMGS_CSS", coverImgsCss });
  }, [audioPlayerDispatch, coverImgsCss]);

  useEffect(() => {
    if (!isMounted || !audioInitialState) return;

    audioPlayerDispatch({
      type: "SET_INITIAL_STATES",
      audioState: audioInitialState,
      curPlayId: audioInitialState.curPlayId,
    });
  }, [audioInitialState, audioPlayerDispatch]);

  useEffect(() => {
    if (!isMounted) return;

    audioPlayerDispatch({ type: "UPDATE_PLAY_LIST", playList });
  }, [audioPlayerDispatch, playList]);

  useEffect(() => {
    if (!isMounted || !customIcons) return;

    audioPlayerDispatch({ type: "SET_CUSTOM_ICONS", customIcons });
  }, [customIcons, audioPlayerDispatch]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
};
