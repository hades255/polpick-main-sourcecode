import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import SocketEvents from "@/json/events/socketEvents";
import { formatChatTime } from "@/lib/functions/_helpers.lib";
import { sendChatMessage } from "@/lib/functions/sockets.lib";
import { IUserChatInterface } from "@/reduxtoolkit/interfaces/interfaces";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import ChatIcon from "@/ui/Icons/ChatIcon";
import CrossIcon from "@/ui/Icons/CrossIcon";
import { Box, Button, List, ListItem, Typography, styled } from "@mui/material";
import Image from "next/image";
import { GlobalSocket } from "pages/_app";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const FormSec = styled(Box)`
  margin-top: 10px;
  @media (min-width: 1921px) {
    margin-top: 2vh;
  }
  .form-group {
    background-color: rgba(40, 44, 70, 0.2);
    border: 1.5px solid rgba(103, 120, 177, 0.3);
    border-radius: 20px;
    position: relative;
    height: 63px;
    @media (min-width: 1921px) {
      height: 7vh;
    }
    .MuiFormControl-root {
      height: 100%;
      &.MuiTextField-root {
        .MuiInputBase-root {
          min-width: auto;
          background-color: rgba(40, 44, 70, 0.2);
          border: 0;
          height: 100%;
          padding-right: 70px;
          font-size: 12px;

          input {
            @media (min-width: 1921px) {
              font-size: 0.75vw;
            }
            &::placeholder {
              /* Chrome, Firefox, Opera, Safari 10.1+ */
              color: rgba(236, 243, 255, 0.3) !important;
              opacity: 1;
              /* Firefox */
            }

            &:-ms-input-placeholder {
              /* Internet Explorer 10-11 */
              color: rgba(236, 243, 255, 0.3) !important;
            }

            &::-ms-input-placeholder {
              /* Microsoft Edge */
              color: rgba(236, 243, 255, 0.3) !important;
            }
          }
          fieldset {
            display: none;
          }
        }
      }
    }

    .chat_btn {
      height: 44px;
      width: 44px;
      min-width: auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      padding: 0;
      position: absolute;
      top: 9.5px;
      right: 9.5px;

      /* 3 */
      background: radial-gradient(
          95.83% 95.83% at 16.67% 4.17%,
          #769bff 0%,
          #326aff 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
      &:hover {
        background: radial-gradient(
          95.83% 95.83% at 16.67% 4.17%,
          #326aff 0%,
          #769bff 100%
        );
      }
      @media (min-width: 1921px) {
        width: 5vh;
        height: 5vh;
        border-radius: 0.65vw;
        svg {
          width: 1vw;
          height: 1vw;
        }
      }
    }
  }
`;

type FormData = {
  chatContent: string;
};
const DashboardChatSection = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const walletSelector = useAppSelector((state) => state.walletSlice);
  const userSelector = useAppSelector((state) => state.userSlice);

  const [chatMessage, setChatMessage] = useState<IUserChatInterface[]>([]);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const getChatMessage = (data: IUserChatInterface) => {
      setChatMessage((prevMessages) => [...prevMessages, data]);
    };

    GlobalSocket.on(SocketEvents.listen.chatMessage, getChatMessage);
    return () => {
      GlobalSocket.off(SocketEvents.listen.chatMessage, getChatMessage);
    };
  }, []);

  useEffect(() => {
    // Scroll to the last added item when chatMessage changes
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chatMessage]);

  const handleInput = (data: FormData) => {
    if (!data?.chatContent?.length) {
      toast.warning("Message is empty");
      return;
    }
    if (userSelector.userData?.username && walletSelector.wallet) {
      const chatPayload: IUserChatInterface = {
        avatarUrl: userSelector.userData.profile_image || "",
        message: data.chatContent,
        time: Date.now(),
        walletId: walletSelector.wallet,
        isNew: false, // user already added to the list when connecting wallet
        username: userSelector.userData?.username
      };

      sendChatMessage(chatPayload);
    } else {
      toast.warning("Please connect your wallet first!");
    }
    // GlobalSocket.on(SocketEvents.listen.chatMessage, getChatMessage);

    reset();
  };

  return (
    <Box className="chat_sec">
      <Box className="cross_icon">
        <Button>
          <CrossIcon />
        </Button>
      </Box>

      <Box className="rgt_card_lower">
        <List disablePadding ref={listRef}>
          {chatMessage?.length
            ? chatMessage?.map((chat, index) => (
                <ListItem
                  disablePadding
                  key={`${chat.username}+'__'+${index.toString()}`}
                >
                  <figure>
                    <Image
                      src={
                        chat?.avatarUrl
                          ? chat?.avatarUrl
                          : assest.singleCardImage1
                      } //chat avatar
                      alt=""
                      height={32}
                      width={32}
                    />
                  </figure>
                  <Box className="user_name">
                    <Typography variant="h5">{chat.username}</Typography>

                    <Typography
                      variant="body1"
                      className={chat.isNew ? "join" : "join2"}
                    >
                      {chat.message}
                    </Typography>
                  </Box>
                  <Typography variant="body1" className="status">
                    {formatChatTime(chat.time)}
                  </Typography>
                </ListItem>
              ))
            : null}
          {/* {chatMessage?.length ? (
            chatMessage?.map((chat, index) => (
              <ListItem
                disablePadding
                key={`${chat.username}+'__'+${index.toString()}`}
              >
                <figure>
                  <Image
                    src={
                      chat?.avatarUrl
                        ? chat?.avatarUrl
                        : assest.singleCardImage1
                    } //chat avatar
                    alt=""
                    height={32}
                    width={32}
                  />
                </figure>
                <Box className="user_name">
                  <Typography variant="h5">{chat.username}</Typography>

                  <Typography
                    variant="body1"
                    className={chat.isNew ? "join" : "join2"}
                  >
                    {chat.message}
                  </Typography>
                </Box>
                <Typography variant="body1" className="status">
                  {formatChatTime(chat.time)}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Box>
              {Array.from({ length: 5 }, (_, index) => index + 1).map(() => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px"
                  }}
                >
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    width="calc(100% - 30px)"
                    sx={{
                      marginLeft: "10px"
                    }}
                  />
                </Box>
              ))}
            </Box>
          )} */}
        </List>
      </Box>
      <FormSec>
        <Box className="form-group">
          <form
            onSubmit={handleSubmit(handleInput)}
            className="w-full mr-2 relative h-full"
          >
            <InputFieldCommon
              placeholder="Write a message"
              {...register("chatContent")}
            />
            <Button className="chat_btn" type="submit">
              <ChatIcon />
            </Button>
          </form>
        </Box>
      </FormSec>
    </Box>
  );
};

export default DashboardChatSection;
