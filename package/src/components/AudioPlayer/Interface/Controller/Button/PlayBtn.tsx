import { FC, useMemo } from "react";
import styled from "styled-components";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { StyledBtn } from "./StyledBtn";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";
import { Icon } from "../Icon";

const StyledPlayBtn = styled(StyledBtn)`
  width: 35px;
`;

export const PlayBtn: FC = () => {
  const { curAudioState, customIcons } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const changePlayState = () =>
    audioPlayerDispatch({ type: "CHANGE_PLAYING_STATE" });
  const PlayIcon = useMemo(() => {
    if (curAudioState.isPlaying)
      return (
        <Icon
          render={<MdPauseCircleFilled />}
          customIcon={customIcons?.pause}
        />
      );
    return (
      <Icon render={<MdPlayCircleFilled />} customIcon={customIcons?.play} />
    );
  }, [curAudioState.isPlaying, customIcons?.pause, customIcons?.play]);

  return (
    <StyledPlayBtn onClick={changePlayState} className="play-button">
      {PlayIcon}
    </StyledPlayBtn>
  );
};
