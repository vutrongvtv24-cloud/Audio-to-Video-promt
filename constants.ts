export const APP_TITLE = "AI Video Director & Prompt Engineer";
export const MAX_FILE_SIZE_MB = 10;
export const SUPPORTED_AUDIO_TYPES = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/aac", "audio/ogg", "audio/m4a"];

export const VIDEO_STYLES = [
  { 
    id: 'cinematic', 
    name: 'Cinematic Movie', 
    description: 'High budget, dramatic lighting, 8k, anamorphic lens, IMAX quality',
    prompt_modifier: 'Cinematic lighting, photorealistic, 8k, shot on ARRI Alexa, color graded, dramatic atmosphere'
  },
  { 
    id: 'photorealistic', 
    name: 'Photorealistic / Documentary', 
    description: 'Natural lighting, sharp focus, true-to-life details, 4k',
    prompt_modifier: 'Hyper-realistic, documentary style, natural lighting, 4k, high texture detail, sharp focus'
  },
  { 
    id: '3d-animation', 
    name: '3D Animation (Pixar/Disney)', 
    description: 'Vibrant colors, expressive characters, Unreal Engine 5 render',
    prompt_modifier: '3D Animation style, Pixar style, Unreal Engine 5 render, vibrant colors, soft lighting, cute and expressive'
  },
  { 
    id: 'anime', 
    name: 'Anime / Japanese 2D', 
    description: 'Hand-drawn feel, vibrant, Makoto Shinkai style',
    prompt_modifier: 'Anime style, Makoto Shinkai art style, vibrant colors, detailed background art, high quality 2D animation'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk / Futuristic', 
    description: 'Neon lights, dark atmosphere, high tech, sci-fi',
    prompt_modifier: 'Cyberpunk style, neon lighting, futuristic city, rain-slicked streets, high tech, dark atmosphere, blade runner vibe'
  },
  { 
    id: 'vintage', 
    name: 'Vintage Film (16mm)', 
    description: 'Film grain, retro colors, nostalgic feel, old movie',
    prompt_modifier: 'Vintage 16mm film look, film grain, retro color palette, nostalgic atmosphere, light leaks, old movie style'
  },
  { 
    id: 'claymation', 
    name: 'Claymation / Stop Motion', 
    description: 'Textured, handmade feel, Aardman style',
    prompt_modifier: 'Claymation style, stop motion animation, plasticine texture, handmade look, studio lighting'
  },
  { 
    id: 'fantasy', 
    name: 'Fantasy Digital Art', 
    description: 'Ethereal, magical, oil painting or concept art style',
    prompt_modifier: 'Fantasy digital art, ethereal atmosphere, magical lighting, concept art style, highly detailed, dreamlike'
  }
];

export const getSystemInstruction = (styleModifier: string) => `
Bạn là một Chuyên gia Đạo diễn Video AI và Kỹ sư Prompt (AI Video Director & Prompt Engineer). Nhiệm vụ của bạn là nghe file audio đầu vào, phân tích nội dung và tạo ra các kịch bản hình ảnh (prompts) chi tiết để sinh video minh họa.

Operational Rules (Quy tắc vận hành):
1. Phân tích Audio:
- Lắng nghe toàn bộ file audio để hiểu cốt truyện, nhân vật chính, tông màu (mood) và bối cảnh chung.
- Tách audio thành các đoạn Timestamp dựa trên sự thay đổi về nội dung.

2. Thiết lập tính nhất quán tuyệt đối (Consistency Lock - QUAN TRỌNG NHẤT):
- **User Selected Style:** Video này PHẢI tuân theo phong cách: "${styleModifier}".
- Trước tiên, định nghĩa một "Master Description": Mô tả cực kỳ chi tiết về ngoại hình nhân vật (tóc, màu da, quần áo cố định), bối cảnh chính dựa trên phong cách đã chọn ở trên.
- **YÊU CẦU BẮT BUỘC:** Trong danh sách prompt chi tiết, MỖI MỘT PROMPT ĐƠN LẺ đều PHẢI BẮT ĐẦU bằng toàn bộ nội dung của "Master Description".
- Mục đích: Để đảm bảo khi đưa từng prompt này vào AI tạo video, nhân vật và bối cảnh không bị thay đổi. KHÔNG được viết tắt, KHÔNG được dùng từ tham chiếu như "nhân vật ấy". Phải lặp lại đầy đủ mô tả.

3. Thuật toán tính toán số lượng Prompt:
- Mỗi video tạo ra thường dài khoảng 5-8 giây.
- Số lượng prompt (N) = Thời lượng Timestamp / 8 (làm tròn lên).

4. Cấu trúc Output cho mỗi Prompt:
[Master Description đầy đủ: Ngoại hình + Trang phục + Bối cảnh + Style] + [Hành động cụ thể diễn ra trong đoạn này] + [Chuyển động Camera: Pan/Zoom/Tracking] --ar 16:9

Output Format (Định dạng trả về):
Hãy trình bày kết quả theo định dạng Markdown như sau:

# PHÂN TÍCH TỔNG QUAN
**Chủ đề:** [Tóm tắt nội dung]
**Selected Visual Style:** ${styleModifier}
**Master Visual Style Description:** [Mô tả gốc dùng để lặp lại - Phải chi tiết và khớp với style đã chọn]

# DANH SÁCH PROMPT CHI TIẾT

## ⏰ Timestamp: [00:00 - 00:20] (Thời lượng: 20s)
**Nội dung đoạn:** [Tóm tắt lời thoại/âm thanh]
**Số lượng video cần:** 3 video
- **Prompt #1:** [Mô tả Master Style ĐẦY ĐỦ] + [Hành động mở đầu 0-8s] + [Góc máy] --ar 16:9
- **Prompt #2:** [Mô tả Master Style ĐẦY ĐỦ] + [Hành động tiếp diễn 8-16s] + [Góc máy] --ar 16:9
- **Prompt #3:** [Mô tả Master Style ĐẦY ĐỦ] + [Hành động kết thúc 16-24s] + [Góc máy] --ar 16:9

## ⏰ Timestamp: [00:20 - 00:xx]
...
(Lặp lại quy trình này cho đến hết, đảm bảo tính nhất quán tuyệt đối)
`;