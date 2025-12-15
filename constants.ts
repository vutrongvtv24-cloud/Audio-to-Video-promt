export const APP_TITLE = "AI Video Director & Prompt Engineer";
export const MAX_FILE_SIZE_MB = 10;
export const SUPPORTED_AUDIO_TYPES = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/aac", "audio/ogg", "audio/m4a"];

export const TEXTS = {
  en: {
    appTitle: "AI Video Director & Prompt Engineer",
    role: "PROMPT ENGINEER AGENT",
    newProject: "New Project",
    heroTitlePrefix: "Turn Audio into",
    heroTitleSuffix: "Cinematic Stories",
    heroDesc: "Upload a voiceover, podcast clip, or story narration. The AI Director will analyze the context, establish a consistent visual style, and generate precise video generation prompts for you.",
    chooseStyle: "Choose Visual Style",
    dropHere: "Drop the audio here",
    uploadClick: "Click to upload or drag and drop",
    uploadLimit: (max: number) => `MP3, WAV, AAC, M4A (Max ${max}MB)`,
    analyzing: "Analyzing Audio Stream",
    analyzingDesc: "The AI Director is listening to your audio, analyzing the mood, and composing the visual storyboard...",
    step1: "Listening",
    step2: "Contextualizing",
    step3: "Directing",
    analysisFailed: "Analysis Failed",
    tryAgain: "Try Again",
    resultTitle: "Director's Script",
    exportTxt: "Export TXT",
    downloadMd: "Download MD",
    copy: "Copy All",
    copied: "Copied!",
    footerPowered: "Powered by Gemini 2.5 Flash • Optimized for Video Generation Models",
    author: "Author",
    zalo: "Zalo"
  },
  vi: {
    appTitle: "Đạo diễn Video AI & Kỹ sư Prompt",
    role: "TRỢ LÝ KỸ SƯ PROMPT",
    newProject: "Dự án mới",
    heroTitlePrefix: "Biến âm thanh thành",
    heroTitleSuffix: "Câu chuyện Điện ảnh",
    heroDesc: "Tải lên giọng đọc, podcast hoặc câu chuyện. Đạo diễn AI sẽ phân tích ngữ cảnh, thiết lập phong cách hình ảnh nhất quán và tạo ra các prompt tạo video chính xác cho bạn.",
    chooseStyle: "Chọn Phong cách Hình ảnh",
    dropHere: "Thả file âm thanh vào đây",
    uploadClick: "Nhấn để tải lên hoặc kéo thả",
    uploadLimit: (max: number) => `MP3, WAV, AAC, M4A (Tối đa ${max}MB)`,
    analyzing: "Đang phân tích âm thanh",
    analyzingDesc: "Đạo diễn AI đang nghe âm thanh của bạn, phân tích cảm xúc và xây dựng kịch bản hình ảnh...",
    step1: "Đang nghe",
    step2: "Xử lý ngữ cảnh",
    step3: "Đạo diễn",
    analysisFailed: "Phân tích thất bại",
    tryAgain: "Thử lại",
    resultTitle: "Kịch bản Đạo diễn",
    exportTxt: "Xuất TXT",
    downloadMd: "Tải xuống MD",
    copy: "Sao chép",
    copied: "Đã chép!",
    footerPowered: "Được hỗ trợ bởi Gemini 2.5 Flash • Tối ưu hóa cho các mô hình tạo video",
    author: "Tác giả",
    zalo: "Zalo"
  }
};

export const VIDEO_STYLES = [
  { 
    id: 'cinematic', 
    name: 'Cinematic Movie',
    name_vi: 'Điện ảnh Hollywood',
    description: 'High budget, dramatic lighting, 8k, anamorphic lens',
    description_vi: 'Ngân sách cao, ánh sáng kịch tính, quay bằng lens Anamorphic',
    prompt_modifier: 'Cinematic lighting, photorealistic, 8k, shot on ARRI Alexa, color graded, dramatic atmosphere',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'photorealistic', 
    name: 'Photorealistic / Doc',
    name_vi: 'Tài liệu thực tế',
    description: 'Natural lighting, sharp focus, true-to-life details',
    description_vi: 'Ánh sáng tự nhiên, sắc nét, chi tiết chân thực như phim tài liệu',
    prompt_modifier: 'Hyper-realistic, documentary style, natural lighting, 4k, high texture detail, sharp focus',
    image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: '3d-animation', 
    name: '3D Animation', 
    name_vi: 'Hoạt hình 3D',
    description: 'Pixar/Disney style, Unreal Engine 5 render',
    description_vi: 'Phong cách Pixar/Disney, kết xuất Unreal Engine 5 rực rỡ',
    prompt_modifier: '3D Animation style, Pixar style, Unreal Engine 5 render, vibrant colors, soft lighting, cute and expressive',
    image: 'https://images.unsplash.com/photo-1633511090164-b43840ea1607?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'anime', 
    name: 'Anime / Japanese 2D', 
    name_vi: 'Anime Nhật Bản',
    description: 'Hand-drawn feel, vibrant, Makoto Shinkai style',
    description_vi: 'Nét vẽ tay 2D, màu sắc rực rỡ, phong cách Makoto Shinkai',
    prompt_modifier: 'Anime style, Makoto Shinkai art style, vibrant colors, detailed background art, high quality 2D animation',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    name_vi: 'Cyberpunk Viễn tưởng',
    description: 'Neon lights, dark atmosphere, high tech, sci-fi',
    description_vi: 'Đèn neon, không khí tối tăm, công nghệ cao, Sci-fi',
    prompt_modifier: 'Cyberpunk style, neon lighting, futuristic city, rain-slicked streets, high tech, dark atmosphere, blade runner vibe',
    image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'vintage', 
    name: 'Vintage Film (16mm)', 
    name_vi: 'Phim nhựa cổ điển',
    description: 'Film grain, retro colors, nostalgic feel',
    description_vi: 'Hạt nhiễu film, màu hoài cổ, cảm giác cũ kỹ những năm 90',
    prompt_modifier: 'Vintage 16mm film look, film grain, retro color palette, nostalgic atmosphere, light leaks, old movie style',
    image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'claymation', 
    name: 'Claymation', 
    name_vi: 'Hoạt hình đất sét',
    description: 'Textured, handmade feel, Aardman style',
    description_vi: 'Chất liệu đất sét, thủ công, phong cách Aardman',
    prompt_modifier: 'Claymation style, stop motion animation, plasticine texture, handmade look, studio lighting',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'fantasy', 
    name: 'Fantasy Art', 
    name_vi: 'Thần thoại huyền ảo',
    description: 'Ethereal, magical, oil painting style',
    description_vi: 'Huyền bí, phép thuật, phong cách tranh sơn dầu kỹ thuật số',
    prompt_modifier: 'Fantasy digital art, ethereal atmosphere, magical lighting, concept art style, highly detailed, dreamlike',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'
  }
];

export const getSystemInstruction = (styleModifier: string, language: 'en' | 'vi') => {
  const isVietnamese = language === 'vi';
  
  return `
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
${isVietnamese ? 
  'Hãy trình bày kết quả phân tích (Tiêu đề, tóm tắt) bằng TIẾNG VIỆT. Tuy nhiên, các nội dung trong "Prompt #1", "Prompt #2"... phải được viết bằng TIẾNG ANH (vì AI tạo video hiểu tiếng Anh tốt hơn), hoặc viết Tiếng Anh kèm chú thích Tiếng Việt.' : 
  'Present the analysis and prompts entirely in English.'
}

Hãy trình bày kết quả theo định dạng Markdown như sau:

# ${isVietnamese ? 'PHÂN TÍCH TỔNG QUAN' : 'OVERVIEW ANALYSIS'}
**${isVietnamese ? 'Chủ đề' : 'Topic'}:** [Tóm tắt nội dung]
**Selected Visual Style:** ${styleModifier}
**Master Visual Style Description:** [Mô tả gốc dùng để lặp lại - Phải chi tiết và khớp với style đã chọn]

# ${isVietnamese ? 'DANH SÁCH PROMPT CHI TIẾT' : 'DETAILED PROMPT LIST'}

## ⏰ Timestamp: [00:00 - 00:20] (Duration: 20s)
**${isVietnamese ? 'Nội dung đoạn' : 'Segment Content'}:** [Tóm tắt lời thoại/âm thanh]
**${isVietnamese ? 'Số lượng video cần' : 'Videos needed'}:** 3 videos
- **Prompt #1:** [Mô tả Master Style ĐẦY ĐỦ] + [Hành động mở đầu 0-8s] + [Góc máy] --ar 16:9
- **Prompt #2:** [Mô tả Master Style ĐẦY ĐỦ] + [Hành động tiếp diễn 8-16s] + [Góc máy] --ar 16:9
- **Prompt #3:** [Mô tả Master Style ĐẦY ĐỦ] + [Hành động kết thúc 16-24s] + [Góc máy] --ar 16:9

## ⏰ Timestamp: [00:20 - 00:xx]
...
(Lặp lại quy trình này cho đến hết, đảm bảo tính nhất quán tuyệt đối)
`;
};